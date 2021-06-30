import React from 'react'
import {  Button,
    Form,
    Grid,
    Header,
    Message,
    Segment } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";

export default function LoginJobseeker({signIn}) {
    return (
        <div>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={6}>
          </Grid.Column>
          <Grid.Column width={10} style={{ maxWidth: 450 }}>
            <Header as="h2" inverted color="red" textAlign="center">
              <Header.Content>
                <Header.Content>Giriş Yap</Header.Content>
              </Header.Content>
            </Header>
            <Form size="large">
              <Segment textAlign="left" color="red" stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="E-posta Adresi"
                  placeholder="E-posta adresi"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Şifre"
                  placeholder="Şifre"
                  type="password"
                />
                <Button onClick={signIn} primary fluid size="large">
                  GİRİŞ YAP
                </Button>
              </Segment>
            </Form>
            <Message>
              Hesabınız yok mu?{" "}
              <Button as={NavLink} to="/registerjobseeker" color="green">
                KAYIT OL
              </Button>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}