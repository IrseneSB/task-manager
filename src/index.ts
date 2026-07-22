import type{Task,TaskPayload } from "./models/tasks";
import {tasks} from "./data/taskstore";

let nextTaskId = 1;
const server=Bun.serve({
    port:3000,
    async fetch(request){
        const url=new URL(request.url);
        const parts=url.pathname.split("/");
        
        if(request.method==="POST" && url.pathname==="/tasks" ){

            const body=await request.json() as TaskPayload;

            if(!body.title || !body.description){

                return Response.json({error: "title and description are required"},
                                    {status:400}
                );
            }

            const newTask: Task = {
                id: nextTaskId,
                uuid: crypto.randomUUID(),
                title :body.title,
                description :body.description,
                priority: body.priority ?? "medium",
                status: body.status ?? "pending",
                created_at: new Date(),
                updated_at: new Date(),
            };

            tasks.push(newTask);
            nextTaskId++;

            return  Response.json(newTask,{status:201});

        } else if(request.method==="GET" && url.pathname==="/tasks"){

            return Response.json(tasks,{status:200});

        }
        else if(request.method==="GET" && parts[1]==="tasks" && parts[2]){
            const task=tasks.find((task) => task.id ===Number(parts[2]));
            if(task){
                 return Response.json(task,{status:200});
            }else{
                return Response.json({error:"task not found"},{status:200});
            }
           

        }else if(request.method==="PUT" &&  parts[1]==="tasks" && parts[2]){
            return;
            
        }else if(request.method==="DELETE" &&  parts[1]==="tasks" && parts[2]){
            return;
        }
    

        } 
        return new Response("Hello ");
    },
});

console.log(`server is listening to http://localhost:${server.port}`);