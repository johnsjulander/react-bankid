import { FailedHintCode, PendingHintCode } from 'bankid/lib/bankid'

export const scenarioToRfa = {
  // The user access the service using a browser on a personal computer
  initDesktop: 19,
  // The user access the service using a browser on a mobile device
  initMobile: 20,
  // The name of link or button used to start the BankID App
  nameOfButtonStartBankId: 18
}

export const pendingHintCodeToRfa = (key: PendingHintCode) =>
  ({
    outstandingTransaction: '1',
    noClient: '1',
    started: '14b',
    userSign: '9',
    unknown: '21'
  }[key])

export const failedHintCodeToRfa = (key: FailedHintCode) =>
  ({
    expiredTransaction: '8',
    certificateErr: '16',
    userCancel: '6',
    cancelled: '3',
    startFailed: '17',
    unknown: '22'
  }[key])

export type ErrorCode =
  | 'alreadyInProgress'
  | 'invalidParameters'
  | 'unknown'
  | 'unauthorized'
  | 'notFound'
  | 'requestTimeout'
  | 'unsupportedMediaType'
  | 'internalError'
  | 'Maintenance'

export const errorCodesToRfa = (key: ErrorCode) =>
  ({
    alreadyInProgress: '4',
    invalidParameters: 'invalidParameters',
    unknown: '22',
    unauthorized: 'unauthorized',
    notFound: 'notFound',
    requestTimeout: '5',
    unsupportedMediaType: 'unsupportedMediaType',
    internalError: '5',
    Maintenance: '5'
  }[key])

export const RFAtoText = (key: string) =>
  // @ts-ignore
  ({
    '1': { SE: 'Starta BankID-appen.', EN: 'Start your BankID app.' },
    '2': {
      SE: `Du har inte BankID-appen installerad. Kontakta din internetbank.`,
      EN: `The BankID app is not installed. Please contact your internet bank`
    },
    '3': { SE: 'Åtgärden avbruten. Försök igen.', EN: 'Action cancelled. Please try again. ' },
    '4': {
      SE: `En identifiering eller underskrift för det här personnumret är redan påbörjad. Försök igen.`,
      EN: `An identification or signing for this personal number is already started. Please try again`
    },
    '5': { SE: 'Internt tekniskt fel. Försök igen.', EN: 'Internal error. Please try again.' },
    '6': { SE: 'Åtgärden avbruten.', EN: 'Action cancelled.' },
    '8': {
      SE: `BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du hämta ett hos din Bank. Försök sedan igen.`,
      EN: `The BankID app is not responding. Please check that the program is started and that you have internet access. If you don’t have a valid BankID you can get one from your bank. Try again.`
    },
    '9': {
      SE: `Skriv in din säkerhetskod i BankIDappen och välj Legitimera eller Skriv under.`,
      EN: `Enter your security code in the BankID app and select Identify or Sign.`
    },
    '13': { SE: `Försöker starta BankID-appen.`, EN: `Trying to start your BankID app` },
    '14b': {
      SE: `Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank. Om du har ett BankID på en annan enhet kan du starta din BankID-app där.`,
      EN: `Searching for BankID:s, it may take a little while… If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this identification/signing on this device. If you don’t have a BankID you can order one from your internet bank. If you have a BankID on another device you can start the BankID app on that device.`
    },
    '15b': {
      SE: `Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella identifieringen/underskriften i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank.`,
      EN: `Searching for BankID:s, it may take a little while… If a few seconds have passed and still no BankID has been found, you probably don’t have a BankID which can be used for this identification/signing on this device. If you don’t have a BankID you can order one from your internet bank`
    },
    '16': {
      SE: `Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller hämta ett nytt hos din internetbank.`,
      EN: `The BankID you are trying to use is revoked or too old. Please use another BankID or order a new one from your internet bank`
    },
    '17a': {
      SE: `BankID-appen verkar inte finnas i din dator eller telefon. Installera den och hämta ett BankID hos din internetbank. Installera appen från din appbutik eller https://install.bankid.com.`,
      EN: `The BankID app couldn’t be found on your computer or mobile device. Please install it and order a BankID from your internet bank. Install the app from your app store or https://install.bankid.com.`
    },
    '17b': {
      SE: `Misslyckades att läsa av QR koden. Starta BankID-appen och läs av QR koden. Om du inte har BankID-appen måste du installera den och hämta ett BankID hos din internetbank. Installera appen från din appbutik eller https://install.bankid.com`,
      EN: `Failed to scan the QR code. Start the BankID app and scan the QR code. If you don't have the BankID app, you need to install it and order a BankID from your internet bank. Install the app from your app store or https://install.bankid.com.`
    },
    '18': { SE: `Starta BankID-appen`, EN: `Start the BankID app ` },
    '19': {
      SE: `Vill du identifiera dig eller skriva under med BankID på den här datorn eller med ett Mobilt BankID?`,
      EN: `Would you like to identify yourself or sign with a BankID on this computer or with a Mobile BankID?`
    },
    '20': {
      SE: `Vill du identifiera dig eller skriva under med ett BankID på den här enheten eller med ett BankID på en annan enhet?`,
      EN: `Would you like to identify yourself or sign with a BankID on this device or with a BankID on another device?`
    },
    '21': {
      SE: `Identifiering eller underskrift pågår.`,
      EN: `Identification or signing in progress.`
    },
    '22': { SE: `Okänt fel. Försök igen.`, EN: `Unknown error. Please try again.` },
    invalidParameters: {
      SE: `Ett fel uppstod på sidan du besöker. Felaktiga parametrar`,
      EN: `An error occurred. Invalid parameters.`
    },
    unauthorized: {
      SE: `Ett fel uppstod på sidan du besöker. Obehörig.`,
      EN: `An error occurred. Unauthorized.`
    },
    notFound: {
      SE: `Ett fel uppstod på sidan du besöker. Resurs saknas.`,
      EN: `An error occurred. Not found.`
    },
    unsupportedMediaType: {
      SE: `Ett fel uppstod på sidan du besöker. Saknas stöd för fil typ`,
      EN: `An error occurred. Unsupported media type.`
    }
  }[key]?.SE || '')
