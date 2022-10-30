import React, { useEffect, useState } from 'react'
import { Box, Select } from '@chakra-ui/react';
import { Categories, Companies, Localities, Modalities, Perks, Seniorities, Technologies } from '../models';
import { getCategories, getCompanies, getLocalities, getModalities, getPerks, getSeniorities, getTechnologies } from '../services';
import { FilterCategories } from './FilterCategories';
import { FilterCompanies } from './FilterCompanies';
import { FilterSeniorities } from './FilterSeniorities';





export const Results = () => {

    const [categories, setCategories] = useState({} as Categories)
    const [companies, setCompanies] = useState({} as Companies)
    const [localities, setLocalities] = useState({} as Localities)
    const [modalities, setModalities] = useState({} as Modalities)
    const [perks, setPerks] = useState({} as Perks)
    const [seniorities, setSenorities] = useState({} as Seniorities)
    const [technologies, setTechnologies] = useState({} as Technologies)



    useEffect(() => {

        const data = Promise.allSettled([getCategories(10,1), getCompanies(10,1), getLocalities(10,1), getModalities(10, 1)])
	        
        data.then(res => {
            console.log(res);
            
        })
        
		// getCategories().then(res => {
		// 	setCategories(res)
			
		// })

		// getCompanies().then(res => {
		// 	setCompanies(res)
			
		// })

		// getLocalities().then(res => {
		// 	setLocalities(res)
			
		// })

		// getModalities().then(res => {
		// 	setModalities(res)
			
		// })

		// getPerks().then(res => {
		// 	setPerks(res)
			
		// })

		// getSeniorities().then(res => {
		// 	setSenorities(res)
			
		// })

		// getTechnologies().then(res => {
		// 	setTechnologies(res)
			
		// })
		
        // console.log(data);
	}, [])

   
    
   
  return (
    <Box width={"100%"}>

        {/* <FilterCategories/>
        <FilterCompanies/>
        <FilterSeniorities/> */}
       
        {/* <FilterCategories/>
        <FilterCategories/>
        <FilterCategories/>
        <FilterCategories/> */}
        {/* <Select
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
        </Select> */}

        {/* <Select
          variant="outline"
          placeholder="Compañías"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
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
        </Select> */}

        {/* <Select
          variant="outline"
          placeholder="Localidades"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
        >
          { 
          Array.isArray(localities?.data) ? 
           
            localities?.data.map(local => {

                return <option key={local.id} value={local.id}>
                    {local.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select> */}

        {/* <Select
          variant="outline"
          placeholder="Modalidades"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
        >
          { 
          Array.isArray(modalities?.data) ? 
           
            modalities?.data.map(modality => {

                return <option key={modality.id} value={modality.id}>
                    {modality.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select> */}

        {/* <Select
          variant="outline"
          placeholder="Beneficios"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
        >
          { 
          Array.isArray(perks?.data) ? 
           
            perks?.data.map(perk => {

                return <option key={perk.id} value={perk.id}>
                    {perk.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select> */}

        {/* <Select
          variant="outline"
          placeholder="Seniority"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
        >
          { 
          Array.isArray(seniorities?.data) ? 
           
            seniorities?.data.map(seniority => {

                return <option key={seniority.id} value={seniority.id}>
                    {seniority.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select> */}

        {/* <Select
          variant="outline"
          placeholder="Tecnologías"
          bg={"white"}
          borderColor={"brand.700"}
          focusBorderColor="brand.900"
          color={"brand.700"}
          fontWeight={"bold"}
          _hover={{
            cursor: "pointer",
          }}
        >
          { 
          Array.isArray(technologies?.data) ? 
           
            technologies?.data.map(technology => {

                return <option key={technology.id} value={technology.id}>
                    {technology.attributes.name}
                </option> 
            })
          
            :
           null
        
          }
        </Select> */}

    </Box>
  )
}
