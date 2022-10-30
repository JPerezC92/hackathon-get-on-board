import { Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Categories } from '../models'
import { getCategories } from '../services'
    

export const FilterCategories = () => {
    // const { data, isSuccess } = useQuery(['categories'], () => getCategories)

    const [categories, setCategories] = useState({} as Categories)

    useEffect(() => {

        getCategories().then(res => {
            setCategories(res);    
        })
        
    }, [])
  

  return (
    <div>

        <Select
          variant="outline"
          placeholder="Categorías"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
          onChange={e => {
                    console.log(e.target.value)
          }}
        >
          { 
          Array.isArray(categories?.data) ? 
           
            categories?.data.map(category => {

                return <option key={category.id} value={category.id}>
                    {category.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select>


    </div>
  )
}
