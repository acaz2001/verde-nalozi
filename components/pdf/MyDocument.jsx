import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { env } from 'process';
import { createTw } from '@react-pdf/tailwind';
import PdfTable from './PdfTable'

const tw = createTw({
  fontFamily: {
    sans: ['Papyrus'],
  },
  colors: {
    custom: '#bada55',
  },
});

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.6,
    color: '#3f3f46',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    color: '#18181b',
  },
  paragraph: {
    marginTop: 20,
  },
  podaciOfirmi: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 18,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: 'green',
  },
  naslovStranke: {
    fontSize: 16,
    color: '#18181b',
  },
  podaciOstranci: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    paddingBottom: 16
  }
});

 const MyDocument = () => (
  <Document >
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Otpremnica</Text>
        <Text>#6af75ca05881e5880d369ef8</Text>
      </View>

      <View style={styles.podaciOfirmi}>
        <View>
          <Text style={styles.title}>
            {process.env.NEXT_PUBLIC_IME_FIRME}
          </Text>
        </View>
        <View>
          <Text>
            Bulevar kralja Aleksandra 546, Zvezdara
          </Text>
          <Text>
            Telefon: 0603170707
          </Text>
          <Text>
            Email: verdestaklo011@gmail.com
          </Text>
        </View>
      </View>

      {/* Otpremnica za: */}
      <View style={styles.podaciOstranci}>
        <View style={tw('flex flex-col gap-3')}>
          <View>
            <Text style={styles.naslovStranke}>
              Otpremnica za: 
            </Text>
          </View>
          <View>
            <Text>
              Srdjan stolar
            </Text>
            <Text>
              Telefon: 0603170707
            </Text>
          </View>
        </View>
        <View>
          <Text>
            Datum izdavanja: 20.11.2026
          </Text>
        </View>
      </View>
       {/*END Otpremnica za: */}

       <PdfTable />

      <Text style={styles.paragraph}>
        Everything on this page is a component. View lays things out with
        flexbox, Text renders the copy, and StyleSheet keeps styling close to
        the CSS you already write.
      </Text>
      <Text style={styles.paragraph}>
        Edit any value above and the page redraws. No template language, no
        build step, just React.
      </Text>
    </Page>
  </Document>
);


export default MyDocument;