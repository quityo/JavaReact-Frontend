import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Table, Button } from 'semantic-ui-react'
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
        <div>
            <Card fluid color={"black"}>
                <Card.Content header="Favori İş İlanların"/>
                    <Table celled color={"black"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                                <Table.HeaderCell>Şehir</Table.HeaderCell>
                                <Table.HeaderCell>Maaş Aralığı</Table.HeaderCell>
                                <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                <Table.HeaderCell>Son Tarih</Table.HeaderCell>
                                <Table.HeaderCell>Detaylar</Table.HeaderCell>
                                <Table.HeaderCell>Sil</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {favorites?.map((f) => (
                                <Table.Row key={f.favoriteId}>
                                    <Table.Cell>{f.jobAdvert.employer.companyName}</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.jobPosition?.jobTitle}</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.city?.name}</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.salaryMax}₺ - {f.jobAdvert?.salaryMin}₺</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.workTime?.title}</Table.Cell>
                                    <Table.Cell>{f.jobAdvert?.workType?.type}</Table.Cell>
                                    <Table.Cell>
                                        {(
                                        (new Date(f.jobAdvert?.deadline).getTime() -
                                            new Date(Date.now()).getTime()) /
                                        86400000
                                        )
                                        .toString()
                                        .split(".", 1)}{" "}
                                        gün
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button as={Link} to={`/jobadverts/${f.jobAdvert.jobAdvertId}`}
                                            content="Detayları Gör"
                                            icon="right arrow"
                                            labelPosition="right"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            icon="x"
                                            color={"red"}
                                            onClick={() => handleRemoveFavorite(f.favoriteId)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
            </Card>
        </div>
    )
}
