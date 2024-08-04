import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Task } from "@prisma/client";
import { createTask, updateTask } from "@/actions/actions";

export function CardWithForm({ task }: { task?: Task }) {
  const actionTask = task ? updateTask : createTask;

  return (
    <form action={actionTask}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create task</CardTitle>
          <CardDescription>Create your new task in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {task && <input type="hidden" name="id" defaultValue={task?.id} />}
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title"
                name="title"
                defaultValue={task?.title}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description"
                name="description"
                defaultValue={task?.description ?? ""}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={task?.priority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
          <Button>{task ? "Update" : "Create"}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
