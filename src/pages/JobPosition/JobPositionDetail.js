import React, { useEffect, useState } from 'react'
import { Checkbox,Item } from 'semantic-ui-react'
import { SearchInput } from 'evergreen-ui';
import JobPositionService from '../../services/jobPositionService';

export default function JobPositionDetail() {
    const [position, setPosition] = useState([])

    useEffect(() => { 
        let jobPositionService = new JobPositionService();
        jobPositionService.getJobPositions().then(result => setPosition(result.data.data))
    }, [])

    return (
          <div style={{position:"relative", overflowX:"hidden",overflowY:"auto",maxWidth:"250px", alignContent: "center", justifyContent: "center", marginTop: 10,fontFamily:"Poppins",fontWeight:"500",fontSize:"2",maxHeight:"200px"}}>

            <Item.Group >
                <div style={{display:"flex",alignItems:"center",alignContent:"center",marginTop:10,marginBottom:10,maxWidth:"250px"}}>
            <SearchInput  placeholder="Pozisyon Ara..." />
            </div>
                {
                    position.map(position => (
                        <Checkbox style={{marginTop:10}} key={position.jobPositionId} label={position.jobTitle}  value={position.jobTitle} />
                    ))
                }




            </Item.Group>

        </div>
    )
} 