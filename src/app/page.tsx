import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import Link from "next/link";
import { deleteTask } from "@/actions/actions";

export default async function Home() {
  const tasks = await prisma.task.findMany();
  return (
    <div className="grid grid-cols-3 gap-4 mt-10 px-10">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>{task.title}</CardTitle>
            <Badge
              className={clsx({
                "bg-green-500": task.priority === "low",
                "bg-yellow-500": task.priority === "medium",
                "bg-red-500": task.priority === "high",
                "bg-violet-500": task.priority === "urgent",
              })}
            >
              {task.priority}
            </Badge>
          </CardHeader>
          <CardContent>
            <p>{task.description}</p>
            <span className="text-slate-300">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </CardContent>
          <CardFooter className="flex justify-end gap-x-2">
            <form action={deleteTask}>
              <input type="hidden" name="id" defaultValue={task?.id}/>
              <Button variant={"destructive"} type="submit">Delete</Button>
            </form>
            <Link
              href={`/update/${task.id}`}
              className={buttonVariants({ variant: "secondary" })}
            >
              Edit
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
