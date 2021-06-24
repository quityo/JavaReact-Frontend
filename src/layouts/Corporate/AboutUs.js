import React from 'react'
import SideCorporate from './SideCorporate';
import {  Container, Grid, Header} from 'semantic-ui-react'
 function AboutUs() {
    return (
        <div className="about-us">
        <Container>
          <Grid  inverted position="center">
            <Grid.Row>
            <Grid.Column width={3}>
                <SideCorporate />
            </Grid.Column>
            
              <Grid.Column style={{ textAlign:'left', flex:1,}} width={13}>
              
                <Header inverted  as='h4' content='Hakkımızda' />
               
                <p style={{fontSize: 14, textAlign:'left', flex:1}}>
                <b><u>"funkysun.com"</u></b>   HRMS - Project şahsıma ait bir iş ve eleman bulma sitesidir.<br/>
                05.05.2021 tarih ve <b><u>ENGİN DEMİROĞ</u></b> izin belgesi ile faaliyetlerini local olarak sürdürmektedir.<br/>
                4904 sayılı Türkiye İş Kurumu Kanunu gereğince iş arayanlardan ücret alınması maalesef yasaktır.<br/>
                Şikayetleriniz için bana ya da Engin Hocamıza başvurabilirsiniz! <br/>
                Adres: YouTube olur Discord olur kafanıza göre.<br/>
                 Telefon: 0555 555 55 55<br/>
                 Selametle 40 yaş altı ve üstü kardeşlerim!
                </p>
              </Grid.Column>
              
              <hr />
            </Grid.Row>
          </Grid>
          </Container>
      
          </div>
   
      );
  }
  export default AboutUs;