import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Button, Segment } from 'semantic-ui-react'
import FavoriteService from "../services/FavoriteService"

export default function Favorite() {
    const {authItem} = useSelector(state => state.auth)

    let [favorites, setFavorites] = useState([]);

    let favoriteService = new FavoriteService();
    useEffect(() => {
        let favoriteService = new FavoriteService();
        favoriteService.getByJobseekerId(authItem[0].user.userId).then((result) => {
            setFavorites(result.data.data);
        })
    },[authItem])

    const handleRemoveFavorite = (favoriteId) => {
        favoriteService.removeFavorite(favoriteId).then((result) => {
            setFavorites(favorites.filter((favori) => favori.favoriteId !== favoriteId))
            toast.success(result.data.message)
        })
    }

    return (
        <div style={{
            margin: "auto",
            width:"85%",
          }} >
        
             <Segment color="green" textAlign="center">
              FAVORİTES
            </Segment>
                 
               
                    <Table  color={"black"}>
                        <Table.Header >
                            <Table.Row textAlign="center">
                                
                                <Table.HeaderCell >Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>City</Table.HeaderCell>
                                <Table.HeaderCell>Details</Table.HeaderCell>
                                <Table.HeaderCell>Delete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {favorites?.map((f) => (
                                <Table.Row key={f.favoriteId}>
                                    <Table.Cell>{f.jobAdvert.employer.companyName}</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.jobPosition?.jobTitle}</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.city?.name}</Table.Cell>
                                    {/* <Table.Cell>
                                        {(
                                        (new Date(f.jobAdvert?.deadline).getTime() -
                                            new Date(Date.now()).getTime()) /
                                        86400000
                                        )
                                        .toString()
                                        .split(".", 1)}{" "}
                                        gün
                                    </Table.Cell> */}
                                    <Table.Cell>
                                        <Button as={Link} to={`/jobadverts/${f.jobAdvert.jobAdvertId}`}
                                          fluid  size='small' color='green'>View</Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button fluid size='small'
                                            icon="x"
                                            color={"red"}
                                            onClick={() => handleRemoveFavorite(f.favoriteId)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
           
        </div>
    )
}
