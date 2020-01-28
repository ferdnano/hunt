import React, { Component } from 'react';
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default class Main extends Component {

    static NavigationOptions = {
        title: 'JSHunt',
    };

    state = {
        productInfo: {},
        docs: [
                {
                    "_id": "5b6b31eb31762700049b33df",
                    "title": "React Native",
                    "description": "A framework for building native apps with React.",
                    "url": "https://github.com/facebook/react-native",
                    "createdAt": "2018-08-08T18:09:47.706Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b33ef31762700049b33e0",
                    "title": "ReactJS",
                    "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
                    "url": "https://github.com/facebook/react",
                    "createdAt": "2018-08-08T18:18:23.481Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b344331762700049b33e1",
                    "title": "Nuclice",
                    "description": "An open IDE for web and native mobile development, built on top of Atom",
                    "url": "https://github.com/facebook/nuclide",
                    "createdAt": "2018-08-08T18:19:47.921Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b345231762700049b33e2",
                    "title": "Relay",
                    "description": "Relay is a JavaScript framework for building data-driven React applications.",
                    "url": "https://github.com/facebook/relay",
                    "createdAt": "2018-08-08T18:20:02.073Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b346931762700049b33e3",
                    "title": "create-react-app",
                    "description": "Create React apps with no build configuration.",
                    "url": "https://github.com/facebook/create-react-app",
                    "createdAt": "2018-08-08T18:20:25.374Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b347931762700049b33e4",
                    "title": "flow",
                    "description": "Adds static typing to JavaScript to improve developer productivity and code quality.",
                    "url": "https://github.com/facebook/flow",
                    "createdAt": "2018-08-08T18:20:41.704Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b348731762700049b33e5",
                    "title": "flipper",
                    "description": "A desktop debugging platform for mobile developers.",
                    "url": "https://github.com/facebook/flipper",
                    "createdAt": "2018-08-08T18:20:55.689Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b349b31762700049b33e6",
                    "title": "Jest",
                    "description": "Delightful JavaScript Testing.",
                    "url": "https://github.com/facebook/jest",
                    "createdAt": "2018-08-08T18:21:15.191Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b34a831762700049b33e7",
                    "title": "Metro",
                    "description": "The JavaScript bundler for React Native.",
                    "url": "https://github.com/facebook/metro",
                    "createdAt": "2018-08-08T18:21:28.595Z",
                    "__v": 0
                },
                {
                    "_id": "5b6b34bd31762700049b33e8",
                    "title": "watchman",
                    "description": "Watches files and records, or triggers actions, when they change.",
                    "url": "https://github.com/facebook/watchman",
                    "createdAt": "2018-08-08T18:21:49.787Z",
                    "__v": 0
                }
            ],
        page: 1,
    };

    componentDidMount() {
        // this.loadProducts();
    };

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({
            docs: [...this.state.docs, ...docs],
            productInfo,
            page
        });

    };

    loadMore = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    renderItem = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity
                style={styles.ProductButton}
                onPress={() => {
                    this.props.navigation.navigate('Product', { product: item });
                }} >
                <Text style={styles.ProductButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    // onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />

            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },

    list: {
        padding: 20,
    },

    productContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20,
    },

    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    productDescription: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },

    ProductButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    ProductButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold',
    }
});