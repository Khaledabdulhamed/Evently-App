'use client'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { getAllCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/database/models/category.model'

const CategoryFilter = () => {

    const [categories, setCategories] = useState<ICategory[]>([])

    const router = useRouter()
   const searchParams = useSearchParams()
  
   useEffect(()=> {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories();
  },[])

    useEffect(()=> {
      const delayDeboundeFn = setTimeout(()=> {
          let newUrl =''
          if(categories) {
               newUrl = formUrlQuery({
                  params: searchParams.toString(),
                  key: 'query',
                  value: categories
              })
          } else {
               newUrl = removeKeysFromQuery({
                  params: searchParams.toString(),
                  keysToRemove: ['query'],
              })
          }
  
          router.push(newUrl, {scroll: false})
      })
      return () => clearTimeout(delayDeboundeFn)
    }, [categories, searchParams, router])
   
    const onSelectCategory = (category: string) => {

    }

  return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
        </SelectTrigger>
         <SelectContent>
        <SelectItem value="All" className='select-item p-regular-14 '>All</SelectItem>
          </SelectContent>
         </Select>

  )
}

export default CategoryFilter