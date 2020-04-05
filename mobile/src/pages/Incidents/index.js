import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../../services/api'

import logoImg from '../../assets/logo.png';
import styles from './styles';
import { render } from 'react-dom';

export default function Incidents() {

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation();

    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if(loading) return;

        if(total > 0 && incidents.length == total) return;

        setLoading(true);

        // const response = await api.get('incidents');
        // setIncidents(response.data);

        const response = await api.get('incidents', {params: { page }})
        // .then(response => setIncidents([...incidents, ...response.data]));
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(() => {        
        loadIncidents();
    }, []);


    function renderLoading(){
        if(!loading) return null;

        return <View style ={styles.loading}>
                    <ActivityIndicator />
                </View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um caso e salve o dia</Text>

            <FlatList
                data= {incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>


                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                            .format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() =>navigationToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
                ListFooterComponent={ () => renderLoading() }
            />
        </View>
    );
}