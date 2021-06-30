import React, { useEffect,useState } from 'react'
import WorkTypeService from "../services/workTypeService"
import { Checkbox,Item } from 'semantic-ui-react'
import { SearchInput } from 'evergreen-ui';

export default function WorkType() {
    const [workType, setWorkType]= useState([])
    
    useEffect(()=>{
        let workTypeService = new WorkTypeService();
        workTypeService.GetAllWorkTypes().then(result => setWorkType(result.data.data))
    },[])

    return (
        <div style={{position:"relative", overflowX:"hidden",overflowY:"auto",maxWidth:"250px", alignContent: "center", justifyContent: "center", marginTop: 10,fontFamily:"Poppins",fontWeight:"500",fontSize:"2",maxHeight:"200px"}}>
              <Item.Group >
                <div style={{display:"flex",alignItems:"center",alignContent:"center",marginTop:10,marginBottom:10,maxWidth:"250px"}}>
            <SearchInput  placeholder="Çalışma Şekli Ara..." />
            </div>
                {
                    workType.map(workType => (
                        <Checkbox style={{marginTop:10}} key={workType.workTypeId} label={workType.type}  value={workType.type} />
                    ))
                }
            </Item.Group>
        </div>
    )
}