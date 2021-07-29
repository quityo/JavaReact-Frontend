import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <Segment inverted vertical style={{ padding: "1.5em 0em" }}>
            <Container>
              <Grid inverted position="left">
                <Grid.Row>
                  <Grid.Column width={1}></Grid.Column>

                  <Grid.Column style={{ textAlign: "left", flex: 1 }} width={3}>
                    <div className="col">
                      <Header inverted as="h4" content="Kurumsal" />
                      <List link inverted>
                        <List.Item as={NavLink} to="/">
                          Hakkımızda
                        </List.Item>
                        <List.Item as="a">Basında "Funky Sun"</List.Item>
                        <List.Item as="a">Yayınlarımız</List.Item>
                        <List.Item as="a">Gizlilik ve Kullanım</List.Item>
                        <List.Item as="a">Üyelik Silme</List.Item>
                      </List>
                    </div>
                  </Grid.Column>

                  <Grid.Column style={{ textAlign: "left", flex: 1 }} width={3}>
                    <div className="col">
                      <Header inverted as="h4" content="İletişim" />
                      <List link inverted>
                        <List.Item as="a">İletişim Bilgileri</List.Item>
                        <List.Item as="a">Şifre İşlemleri</List.Item>
                        <List.Item as="a">Reklam Verin</List.Item>
                        <List.Item as="a">Bize Yazın</List.Item>
                        <List.Item as="a">SSS</List.Item>
                      </List>
                    </div>
                  </Grid.Column>

                  <Grid.Column inverted as="h4" width={10}>
                    <div className="col">
                      <p style={{ fontSize: 14, textAlign: "left", flex: 1 }}>
                        <b>FUNKY SUN - HRMS & Project</b>, şahsıma ait bir iş ve
                        eleman bulma sitesidir.
                        <br />
                        05.05.2021 tarih ve{" "}
                        <b>
                          <u>ENGİN DEMİROĞ</u>
                        </b>{" "}
                        yönlendirmeleri ile faaliyetlerini local olarak
                        sürdürmektedir.
                        <br />
                        4904 sayılı Türkiye İş Kurumu Kanunu gereğince iş
                        arayanlardan ücret alınması maalesef yasaktır.
                        <br />
                        Şikayetleriniz için bana ya da Engin Hocamıza
                        başvurabilirsiniz! <br />
                        Adres: YouTube olur Discord olur kafanıza göre.
                        <br />
                        Telefon: 0555 555 55 55
                        <br />
                        Bir Cv'ye, bir iş başvurusuna yenileceksiniz. Vallahi de
                        yenileceksiniz.
                        <br />
                        Selametle 40 yaş altı ve üstü kardeşlerim!
                      </p>
                    </div>
                  </Grid.Column>

                  <hr />
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </div>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Funky Sun | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}
export default Footer;
