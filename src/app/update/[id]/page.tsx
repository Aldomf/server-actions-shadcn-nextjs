import { CardWithForm } from "@/components/Form";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

async function Update({ params }: { params: { id: string } }) {
  const taskId = params.id

  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(taskId),
    },
  })

  if(!task) {
    redirect("/")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <CardWithForm task={task}/>
    </div>
  );
}

export default Update;
