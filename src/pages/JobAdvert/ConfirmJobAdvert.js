import React, { useEffect, useState } from 'react'
import JobAdvertService from '../../services/jobAdvertService'
import { Item, Container,Segment,Label,Button,Icon } from 'semantic-ui-react'

export default function ConfirmJobAdvert() {


  const [jobAdverts, setJobAdverts] = useState([])
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.getByConfirmFalse().then(result => setJobAdverts(result.data.data))
  }, [jobAdverts])
  
  const handleClick = function (jobAdvertId) {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.confirm(jobAdvertId, "true").then()
};

  const itemStyle = {
    borderRadius:20,
    border:"1px solid #a2dec2",
    background:"#a2dec2",
    maxWidth:550,
   fontFamily:"Mukta",
   
  }


  return (

  
    
    <Segment basic style={{maxWidth:850,}}>
     
{
 jobAdverts.map(jobAdvert => (
  
  <Item.Group key={jobAdvert.jobAdvertId}  divided>
 
  <Item as='a'   style ={itemStyle}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:5}}>
   <div style={{padding:".25rem",background:"#fff",border:"1px solid #dee2e6",width:"58px",height:"58px",alignItems:"center",display:"flex"}}> 
    <Item.Image rounded size="medium"  src='https://www.forumistanbul.com.tr/media/image/vatancomputer.jpg' />
    
    </div>
    </div>
    <Item.Content  style={{ 
 
  marginLeft:20,
  paddingTop:20
            }}  >
      <Item.Header style={{fontFamily:"Poppins",fontWeight:"bolder",fontSize:17}} >{jobAdvert.jobTitle}</Item.Header>
      <Item.Meta>
        <span>{jobAdvert.employerCompanyName}</span>

      </Item.Meta>
      <Item.Description style={{fontFamily:"Segoe UI",fontWeight:500}}>
        {jobAdvert.city.name}
      </Item.Description>
      <Item.Description>
        {jobAdvert.description}
      </Item.Description>
      <Container style={{display:"flex",justifyContent:"space-between",alignItems:"left",right:30}}>
      <Item.Extra>
      <Label style={{borderRadius:10, margin: "auto",
    marginRight: "30px",marginBottom:10,fontWeight:600}}   content={jobAdvert.workTime.title} />
      </Item.Extra>

      <Item.Extra >
      <Label style={{borderRadius:20, margin: "auto",
    marginLeft: "30px",fontWeight:600}} icon='time' content="7 gün önce"/>
       
      </Item.Extra>
      </Container>
    </Item.Content>
  </Item>
  <Container style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "10px" }}    >
                            <Item.Extra   >

                                <Button circular basic  >
                                    <Icon style={{ color: "#008080" }} name='delete' />
                                    Reddet
                                </Button>

                            </Item.Extra>
                            <Item.Extra >


                                <Button onClick={e => handleClick(jobAdvert.jobAdvertId)} circular style={{
                                    backgroundColor: "#008080",
                                    borderColor: "#008080",
                                    color: "white",
                                }} >
                                    <Icon name='checkmark' />Onayla</Button>
                            </Item.Extra>
                        </Container>
</Item.Group>

 ))
}
             
    </Segment>

  )
}