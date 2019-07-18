/* This module takes the url obtained from the data-json-url
   value stored in HTML <li> element and fetches the Collection+json  
   object and searches thru the Collection array for a URL that
   matches the regex expression for a audio or video file and 
   returns that url
*/

export default async function(url) {
  let mediaFileUrl = "";
  // Get the Collection object for url returned by
  // the NASA API
  await fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(collectionJSON) {
      let regex = /~orig.mp4$|.mp3$/gi;
      // Iterate thru Collection object and check
      // for a file ending in .mp3 or ~orig.mp4
      collectionJSON.forEach(link => {
        if (link.match(regex)) {
          mediaFileUrl = link;
        }
      });
    });

  return mediaFileUrl;
}
