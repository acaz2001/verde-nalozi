import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { createTw } from '@react-pdf/tailwind';

const styles = StyleSheet.create({
    tableHeader: {
        width: '100%',
        backgroundColor: '#dbdbdb',
        paddingHorizontal: '10px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px'
    },
    tableRow: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: '10px',
        borderBottomWidth: 1,
        borderLeftWidth:1,
        borderRightWidth: 1,
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px'
        
    },
    rezime: {
        width: '100%', 
        height: 30, 
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        paddingHorizontal: 10, 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'black'
    }
})
const tw = createTw({
  fontFamily: {
    sans: ['Papyrus'],
  },
  colors: {
    custom: '#bada55',
  },
});

function PdfTable() {
  return (
    <View>
        <PdfTableHeader />
        <PdfTableRow />
        <PdfTableRow />
        <PdfTableRow />
        <PdfTableRow />
        <PdfTableRow />
        <PdfTableRezime />
    </View>
  )
}

function PdfTableHeader() {
    return (
        <View style={styles.tableHeader}>
            <View style={{borderRightWidth: 1, borderColor: 'black', width: 192}}>
                <Text>
                    Opis
                </Text>
            </View>
            <View style={{width: 25 , borderRightWidth: 1, borderColor: 'black'}}>
                <Text >
                    jm
                </Text>
            </View>
            <View style={{width: 50, borderRightWidth: 1, borderColor: 'black'}}> 
                <Text>
                    Kolicina
                </Text>
            </View>
            <View style={{ width: 92, borderRightWidth: 1, borderColor: 'black' }}>
                <Text>
                    Jed.cena
                </Text>
            </View>
            <View style={{ width: 80}}>
                <Text>
                    Cena
                </Text>
            </View>
        </View>
    )
}

function PdfTableRow() {
    return (
        <View style={styles.tableRow}>
            <View style={{borderRightWidth: 1, borderColor: 'black', width: 192, height: 40, justifySelf: 'center', alignSelf: 'center', paddingTop: 6}}>
                <Text>
                    Usluga demontaza
                </Text>
            </View>
            <View style={{width: 25 ,height: 40, borderRightWidth: 1, borderColor: 'black'}}>
                <Text >
                    m²
                </Text>
            </View>
            <View style={{width: 50, height: 40, borderRightWidth: 1, borderColor: 'black'}}> 
                <Text>
                    20
                </Text>
            </View>
            <View style={{ width: 92, height: 40, borderRightWidth: 1, borderColor: 'black' }}>
                <Text>
                    111450,00
                </Text>
            </View>
            <View style={{ width: 80, height: 40}}>
                <Text>
                    29000,00
                </Text>
            </View>
        </View>
    )
}

function PdfTableRezime() {
    return (
        <View style={styles.rezime}>
            <Text style={{fontWeight: '600', fontSize: 14}}>
                Ukupno za naplatu:
            </Text>
            <Text style={{fontWeight: '600', fontSize: 14}}>
                850000,00
            </Text>
        </View>
    )
}

export default PdfTable
