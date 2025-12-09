import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { db } from "./firebaseConfig";
import {
    doc,
    onSnapshot,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

export default function ChatScreen() {
    const { user } = useLocalSearchParams();
    const currentUser = user === "A" ? "A" : "B";
    //Notes:
    //LocalsearchPrams are basically a way to send simple info when switching screens.
    //We put either give chat.tsx "A" or "B" so the file can know which POV to display


    const [messages, setMessages] = useState<string[]>([]);
    const [whoSaidWhat, setWhoSaidWhat] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState("");

    const chatRef = doc(db, "conservations", "AB");

    useEffect(() => {
        return onSnapshot(chatRef, (snapshot) => {
            const data = snapshot.data();
            if (!data) return;

            const sorted = [...data.messages].sort(
                (a, b) => a.createdAt - b.createdAt
            );

            setMessages(sorted);
        });
    }, []);



    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        await updateDoc(chatRef, {
            messages: arrayUnion({
                text: newMessage,
                from: currentUser,
                createdAt: Date.now(),
            }),
        });
        //text is the actual message
        //from is either A or B
        //created at is a time stamp


        setNewMessage("");
    };


    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.header}>
                Chat as User {currentUser}
            </ThemedText>

            <FlatList
                style={styles.list}
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const isMe = item.from === currentUser;
                    return (
                        <View
                            style={[
                                styles.messageBubble,
                                isMe ? styles.myMessage : styles.otherMessage,
                            ]}
                        >
                            <ThemedText>{item.text}</ThemedText>
                        </View>
                    );
                }}
            />
            {/*This is a loop that goes through all the messages in the AB document, then displays the
            bubbles correctly based on the time stamp and the "from" parameter "*/}

            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />

                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <ThemedText style={{ color: "#fff" }}>Send</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        textAlign: "center",
        marginBottom: 10,
    },
    list: {
        flex: 1,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: "70%",
    },
    myMessage: {
        backgroundColor: "#3B82F6",
        alignSelf: "flex-end",
    },
    otherMessage: {
        backgroundColor: "#E5E7EB",
        alignSelf: "flex-start",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingVertical: 10,
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    sendButton: {
        backgroundColor: "#3B82F6",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
});
