import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import SvgComponent from '../assets/Logo';
import colors from '../colors/colors';
import { fetchUsersRequest } from '../configRedux/actions';

const UsersList = ({ users, loading, error, fetchUsers, navigation }) => {
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    if (loading) {
        return (
            <View style={styles.indicatorContent} >
                <View style={{ marginBottom: 20 }}>
                    <SvgComponent color={colors.white} width={170} height={50} />
                </View>
                <ActivityIndicator size='small' color={colors.white} />
            </View>
        );
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const numberEmployee = users.length

    return (
        <SafeAreaView style={styles.listSection}>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                    <SvgComponent color={colors.secondary} width={170} height={40} />
                </View>
                <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            key={item.id}
                            onPress={() => navigation.navigate('About', { item, numberEmployee })}
                        >
                            <Text style={styles.textWhite}>Name: {item.name}</Text>
                            <Text style={styles.textWhite}>Email: {item.email}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    users: state.users,
    loading: state.loading,
    error: state.error,
});

const mapDispatchToProps = {
    fetchUsers: fetchUsersRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

const styles = StyleSheet.create({
    indicatorContent: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    listSection: {
        flex: 1,
        backgroundColor: colors.white,
    },
    listItem: {
        padding: 12,
        backgroundColor: colors.grey,
        marginBottom: 12,
        borderRadius: 12,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

    },
    headerText: {
        fontSize: 25,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 20
    },
    textWhite: {
        color: colors.white
    }
})
