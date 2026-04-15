import PDFDocument from 'pdfkit'
import * as QRCode from 'Qrcode'
import * as fs from 'fs'
import { randomBytes } from 'crypto'
import Datastore from '@seald-io/nedb'
const db = new Datastore({ filename: './data/books.db', autoload: true })

export interface QRLabelData {
  text: string // The data encoded in the QR
  label: string // The text printed below the QR
}

export interface GridOptions {
  rows: number
  cols: number
  qrSize: number
  padding: number
  margin: number
}
export const qrapi = {
  generateA4QRGrid: async (dataList: QRLabelData[], outputPath: string): Promise<QRLabelData[]> => {
    // A4 Paper Dimensions in Points: 595.28 x 841.89
    const doc: PDFKit.PDFDocument = new PDFDocument({
      size: 'A4',
      margins: { top: 70, bottom: 40, left: 70, right: 40 }
    })

    const stream: fs.WriteStream = fs.createWriteStream(outputPath)
    doc.pipe(stream)

    const options: GridOptions = {
      rows: 10,
      cols: 8,
      qrSize: 60,
      padding: 8,
      margin: 25 // Offset from page edge
    }

    for (let i = 0; i < dataList.length; i++) {
      // Page management: Every 40 items (8x5), start a new page
      const itemsPerPage = options.rows * options.cols
      if (i > 0 && i % itemsPerPage === 0) {
        doc.addPage()
      }

      // Calculate position in the current page grid
      const localIndex = i % itemsPerPage
      const col = localIndex % options.cols
      const row = Math.floor(localIndex / options.cols)

      const x = options.margin + col * (options.qrSize + options.padding)
      const y = options.margin + row * (options.qrSize + options.padding + 10)

      try {
        // Generate QR as Buffer for performance

        const options1: QRCode.QRCodeRenderersOptions = {
          errorCorrectionLevel: 'H', // L, M, Q, H
          type: 'png', // Render as PNG buffer
          margin: 1,
          width: options.qrSize * 2,
          color: {
            dark: '#000000', // Black dots
            light: '#FFFFFF' // White background
          }
        }
        const qrBuffer: Buffer = await QRCode.toDataURL(dataList[i].text, options1)

        // Render Image
        doc.image(qrBuffer, x, y, { width: options.qrSize })

        // Render Label Text
        doc
          .fontSize(8)
          .fillColor('#333333')
          .text(dataList[i].label, x, y + options.qrSize + 2, {
            width: options.qrSize,
            align: 'center',
            ellipsis: true // Prevents overlap if text is too long
          })
      } catch (err) {
        console.error(`Failed to generate QR at index ${i}:`, err)
      }
    }

    doc.end()

    return new Promise((resolve, reject) => {
      stream.on('finish', () => resolve(dataList))
      stream.on('error', (err) => reject(err))
    })
  },
  generateKeydata: async (count: number = 80, length: number = 10): Promise<QRLabelData[]> => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const keys: QRLabelData[] = []
    for (let i = 0; i < count; i++) {
      let key = ''
      const bytes = randomBytes(length)
      for (let j = 0; j < length; j++) {
        key += charset[bytes[j] % charset.length]
      }

      const docs = await db.findAsync({ uniqueId: key })

      docs.length > 0
        ? i--
        : keys.push({
            label: key,
            text: key
          })
    }
    return keys
  }
}

// Usage Example:
// const labels = Array.from({ length: 40 }, (_, i) => ({ text: `ID-${i}`, label: `Unit ${i}` }));
// generateA4QRGrid(labels, 'labels.pdf');
