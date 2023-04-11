import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";
import SeriesManager from "../models/seriesManager";
import PodcastsManager from "../models/podcastsManager";
import React, { useState } from "react";
import PodcastList from "../components/PodcastList";
import styles from "../styles/Category.module.css";

export async function getServerSideProps(context) {
    const podcasts = new PodcastsManager();
    const series = new SeriesManager();

    const podList = await podcasts.getAllPodcasts();
    const seriesList = await series.getAllSeries();

    return {
        props: { podcasts: podList, series: seriesList },
    };
}

export default function SeriesPage({
                                           podcasts,
                                           series,
                                           handlePlayClick,
                                       }) {
    const [podForSeries, setPodForSeries] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(null);

    const handleClick = (seriesId, seriesName) => {
        setPodForSeries(podcasts.filter((podcast) => podcast.seriesId === seriesId));
        setSelectedSeries(seriesName);
    };

    return (
        <>
            <Head>
                <title>Series Page</title>
            </Head>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Series
                </Typography>
                <List>
                    {series.map((ser) => (
                        <ListItem
                            key={ser.id}
                            button={true}
                            onClick={() => handleClick(ser.id, ser.name)}
                        >
                            {ser.name}
                        </ListItem>
                    ))}
                </List>
                <br />
                <Typography variant="h4" className={styles.categoryTitle}>
                    {selectedSeries}
                </Typography>
                {podForSeries.length === 0 ? (
                    <p>Choose the series you want</p>
                ) : (
                    <PodcastList podcasts={podForSeries} handlePlayClick={handlePlayClick} />
                )}
            </Container>
        </>
    );
}
