import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function MyReportsPage({navigation}) {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const firestore = getFirestore();

    useEffect(() => {
        fetchUserReports();
    }, []);

    // Fetch reports submitted by the logged-in user
    const fetchUserReports = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                console.warn("User not authenticated.");
                setLoading(false);
                return;
            }
    
            console.log("Fetching reports for user:", user.uid);
    
            const reportsRef = collection(firestore, "reports");
            const q = query(reportsRef, where("userId", "==", user.uid));  // Filter by userId
            const snapshot = await getDocs(q);
    
            if (snapshot.empty) {
                console.warn("No reports found for this user.");
            }
    
            const userReports = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
    
            console.log("📜 Retrieved reports:", userReports);
            setReports(userReports);
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
        setLoading(false);
    };
    
    // Get dynamic status colors
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return { backgroundColor: '#bde5bf', color: '#2d6a4f' }; // Green
            case 'Pending': return { backgroundColor: '#ffdd57', color: '#7a5b00' }; // Yellow
            case 'Rejected': return { backgroundColor: '#ff6b6b', color: '#9b2226' }; // Red
            default: return { backgroundColor: '#ccc', color: '#333' }; // Default Gray
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Reports</Text>
            <Text style={styles.subtitle}>View all reports you have submitted here.</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#5A6E5B" style={styles.loader} />
            ) : reports.length > 0 ? (
                <FlatList
    data={reports}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity 
            style={styles.reportItem} 
            onPress={() => navigation.navigate("ReportDetailsPage", { report: item })}
        >
            <Text style={styles.reportTitle}>{item.violationType || "Unknown Violation"}</Text> 
            <View style={[styles.statusBadge, { backgroundColor: getStatusStyle(item.status).backgroundColor }]}>
                <Text style={[styles.statusText, { color: getStatusStyle(item.status).color }]}>
                    {item.status}
                </Text>
            </View>
        </TouchableOpacity>
    )}
/>

            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyMessage}>No reports found</Text>
                    <Text style={styles.emptySubtitle}>You have not submitted any reports yet.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#eff1ef', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#3d3f3d', marginBottom: 5 },
    subtitle: { fontSize: 14, color: '#808580', marginBottom: 15 },
    loader: { marginTop: 20 },
    reportItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportTitle: { fontSize: 16, fontWeight: 'bold', color: '#3d3f3d' },
    statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
    statusText: { fontSize: 12, fontWeight: 'bold' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyMessage: { fontSize: 18, fontWeight: 'bold', color: '#3d3f3d' },
    emptySubtitle: { fontSize: 14, color: '#808580', marginTop: 5, textAlign: 'center' },
});
