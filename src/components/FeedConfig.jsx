import React, { useState, useEffect } from 'react';

import Fab from '@material-ui/core/Fab';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import PodcastConfig from 'components/PodcastConfig';
import EpisodeConfig from 'components/EpisodeConfig';

const FeedConfig = ({ rssFeed }) => {
	const [episodes,setEpisodes] = useState([]);
	const [showCodePreview,setShowCodePreview] = useState(false);

	const onEpisodeChange = () => {
		const newItems = [...rssFeed.items];
		setEpisodes(newItems);
	};

	const addEpisode = () => {
		rssFeed.items.push({
			uid: Math.random() * 99999999999
		});
		const newItems = [...rssFeed.items];
		setEpisodes(newItems);
	};

	const addEpisodeTop = () => {
		rssFeed.items.unshift({
			uid: Math.random() * 99999999999
		});
		const newItems = [...rssFeed.items];
		setEpisodes(newItems);
	};


	const downloadRSSFile = () => {
		var dataStr = "data:text/rss;charset=utf-8," + encodeURIComponent(rssFeed.generatePodcastInfoXML());
		var dlAnchorElem = document.createElement('a');
		dlAnchorElem.style.display = 'none';
		document.body.appendChild(dlAnchorElem);
		dlAnchorElem.setAttribute("href",     dataStr     );
		dlAnchorElem.setAttribute("download", "feed.rss");
		dlAnchorElem.click();
	};

	useEffect(() => {
		const newItems = [...rssFeed.items];
		setEpisodes(newItems);
	},[rssFeed,rssFeed.items]);

	return (
		<div>
			<Typography component="h2" variant="h3" color="textPrimary" className="configTitle">
				Your podcast information
			</Typography>

			<FormControlLabel
					control={<Switch checked={showCodePreview} onChange={(event) => { setShowCodePreview(event.target.checked); }} />}
					label="I want to see the RSS code preview"
				/>

			<Paper className="channel">
				<PodcastConfig rssFeed={rssFeed} episodes={episodes} showCodePreview={showCodePreview} />
			</Paper>
			<Typography component="h2" variant="h3" color="textPrimary" className="configTitle">
				Your episodes
			</Typography>
			{ episodes.length === 0 &&
				<div className="noEpisodes">
					You have not created any episodes yet.
				</div>
			}

			{ episodes.length > 0 &&
				<div>
					{ episodes.map((episode,index) => {
						return (
							<EpisodeConfig
								key={episode.uid}
								rssFeed={rssFeed}
								index={index}
								episode={episode}
								onEpisodeChange={onEpisodeChange}
							/>
						)
					} ) } 
				</div>
			}

			<Button onClick={addEpisodeTop}>
				+ Add episode to top
			</Button>

			<Button onClick={addEpisode}>
				+ Add episode to bottom
			</Button>

			<Fab variant="extended" style={{ position: 'fixed', bottom: '20px', right: '20px' }} onClick={downloadRSSFile}>
				<DownloadIcon style={{ marginRight: 10 }} />
				Download RSS file
			</Fab>
		</div>
	);
};
export default FeedConfig;