'use server'

import { CreateEventParams } from "@/types"
import { handleError } from '@/lib/utils'
import { connectToDatabase } from '@/lib/database'
import User from "../database/models/user.model"
import Event from "../database/models/event.model"

export async function createEvents({event, userId, path}: CreateEventParams){

        try {

            await connectToDatabase ()
            const organizer = await User.findById(userId);

            if(!organizer) throw new Error("Organizer not found");                
            

            const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })

            return JSON.parse(JSON.stringify(newEvent));

        } catch (error) {
            handleError(error)
        }

}