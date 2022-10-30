import { Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {  Companies } from '../models'
import {  getCompanies } from '../services'
    

export const FilterCompanies = () => {
   
    const [companies, setCompanies] = useState({} as Companies)

    useEffect(() => {

        getCompanies().then(res => {
            setCompanies(res);    
        })
        
    }, [])
  

  return (
    <div>

        <Select
          variant="outline"
          placeholder="Companies"
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
          Array.isArray(companies?.data) ? 
           
            companies?.data.map(company => {

                return <option key={company.id} value={company.id}>
                    {company.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select>


    </div>
  )
}
