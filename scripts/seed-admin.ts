import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from "drizzle-orm";

const email = "kakkarakshansh72@gmail.com";

async function seedAdmin(){
    const existingUser = await db.query.user.findFirst({where : eq(user.email, email)});
    if(!existingUser){
        throw new Error(`User with email ${email} does not exist. Log in with Hack Club first.`);
    }
    await db
    .update(user)
    .set({
        role : ['member','admin', 'reviewer'],
    })
    .where(eq(user.id, existingUser.id));
    console.log(`${email} is now an admin enjoy`)
}

seedAdmin().catch((error)=>{
    console.log("Failed to seed Admin:", error);
    process.exit(1)
})