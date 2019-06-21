export default function(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(audioFilesJSON) {
      let regex = /.mp3$/gi;
      audioFilesJSON.forEach(audioFileLink => {
        if (audioFileLink.match(regex)) {
          console.log(audioFileLink);
          return audioFileLink;
        }
      });
    });
}
