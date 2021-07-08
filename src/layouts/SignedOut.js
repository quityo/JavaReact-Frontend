import React from 'react';

import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";


export default function SignedOut() {
    return (
        <div>
            <Menu.Item>
                <Button primary as={Link} to={"/login"}>Giriş Yap</Button>
                <Button primary as={Link} to={"/register"} style={{marginLeft:"0.5em"}}>Kayıt Ol</Button>
            </Menu.Item>
        </div>
    )
}
