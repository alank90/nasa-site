export default async function(url) {
  let audioFileLink = "";
  await fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(audioFilesJSON) {
      let regex = /.mp3$/gi;
      audioFilesJSON.forEach(link => {
        if (link.match(regex)) {
          audioFileLink = link;
        }
      });
    });

  return audioFileLink;
}
