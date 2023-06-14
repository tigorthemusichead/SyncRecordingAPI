const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegStatic);

const FFmpeg = {
    transcode: (input: string, output: string) => new Promise((resolve, reject) => {
       ffmpeg()
           .input(input)
           .saveToFile(output)
           .on('progress', (progress: any) => {
               if (progress.percent) {
                   console.log(`Processing: ${Math.floor(progress.percent)}% done`);
               }
           })
           .on('end', () => {
               resolve(true)
           })
           .on('error', (error: any) => {
               console.error(error);
               reject(false)
           });
    }),
    toWAV: async (filePath: string) => {
        try {
            const outputPath = filePath + '.wav'
            await FFmpeg.transcode(filePath, outputPath)
            return({
                success: true,
                file: outputPath
            })
        } catch (err) {
            console.error(err)
            return({
                success: false
            })
        }
    }
}

export default FFmpeg