export default async function(url) {
  let mediaFileLink = "";
  await fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(mediaFilesJSON) {
      let regex = /~orig.mp4$|.mp3$/gi;

      mediaFilesJSON.forEach(link => {
        if (link.match(regex)) {
          mediaFileLink = link;
        }
      });
    });

  return mediaFileLink;
}
