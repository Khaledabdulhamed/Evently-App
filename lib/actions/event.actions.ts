'use server'

import { CreateEventParams } from '@/types'
import { handleError } from '../utils'
import Event from '../database/models/event.model'
import User from '../database/models/user.model'
import { connectToDatabase } from '../database'
import Category from '../database/models/category.model'

const populateEvent = async (query: any) => {
    return query
    .populate({path: 'organizer', model: User, select: '_id firstName lastName'})
    .populate({path: 'category', model: Category, select: '_id name'})
}

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

export const getEventById = async (eventId:string) => {

   try {

    await connectToDatabase()

    const event = await populateEvent(Event.findById(eventId))

    if(!event) {
        throw new Error("Event Not Found");   
    }
    return JSON.parse(JSON.stringify(event))

   } catch (error) {
    
   }
}