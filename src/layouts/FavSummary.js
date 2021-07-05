import React from 'react'
import {  NavLink } from 'react-router-dom';
import { Dropdown } from "semantic-ui-react";
import { useSelector } from 'react-redux';
export default function FavSummary() {

    const {favItems} = useSelector(state => state.favSummary)

    return (
        <div>
           <Dropdown item text='Fav Summary'>
                <Dropdown.Menu > 
                    {
                        favItems.map((favItem) => (
                            <Dropdown.Item  key={favItem.jobAdvert.jobAdvertId}>{favItem.jobAdvert.jobPosition.jobTitle}</Dropdown.Item>
                        ))
                    }
                 <Dropdown.Divider/>
                <Dropdown.Item as={NavLink} to="/fav">Favoriler</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}