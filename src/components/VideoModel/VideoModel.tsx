import React from 'react';

function VideoModel({ video }) {
	// HTML string for the modal
	const modalHTML = `
  <div id="video" style="position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
    <div style="background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; border-radius: 10px; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3); width: 80%; position: relative;">
      <iframe src="${video}" frameborder="0" title="Video Player" style="width: 100%; height: 500px;" allowfullscreen></iframe>
      <button style="position: absolute; top: 20px; right: 25px; color: #aaa; font-size: 28px; font-weight: bold; border: none; background-color: transparent; cursor: pointer;">&times;</button>
    </div>
  </div>
  `;

	// Function to handle close
	const handleClose = () => {
		document.body.removeChild(modalContainer);
	};

	// Create a container element
	const modalContainer = document.createElement('div');
	modalContainer.innerHTML = modalHTML;

	// Attach an event listener to the close button
	const closeButton = modalContainer.querySelector('button');
	closeButton.addEventListener('click', handleClose);

	// Append the container to the body
	document.body.appendChild(modalContainer);

	return null;
}

export default VideoModel;
