"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTask(formData: FormData) {
  const rawFormData = {
    title: formData.get("title") as string | null,
    description: formData.get("description") as string | null,
    priority: formData.get("priority") as string | null,
  };

  if (!rawFormData.title || !rawFormData.priority) {
    throw new Error("Title and priority are required.");
  }

  const newTask = await prisma.task.create({
    data: {
      title: rawFormData.title,
      description: rawFormData.description ?? "",
      priority: rawFormData.priority,
    },
  });

  redirect("/");
}

export async function updateTask(formData: FormData) {
  const taskId = formData.get("id") as string | null;

  if (!taskId) {
    throw new Error("Task id is required");
  }

  const updatedData = {
    title: formData.get("title") as string | null,
    description: formData.get("description") as string | null,
    priority: formData.get("priority") as string | null,
  };

  if (!updatedData.title || !updatedData.priority) {
    throw new Error("Title and description are required");
  }

  const updateUser = await prisma.task.update({
    where: {
      id: parseInt(taskId),
    },
    data: {
      title: updatedData.title,
      description: updatedData.description,
      priority: updatedData.priority,
    },
  });

  redirect("/");
}

export async function deleteTask(formData: FormData) {
  const taskId = formData.get("id") as string | null;

  if (!taskId) {
    throw new Error("Task id is required");
  }

  const deleteTask = await prisma.task.delete({
    where: {
      id: parseInt(taskId),
    },
  });

  revalidatePath("/");
}
