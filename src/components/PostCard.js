import React from 'react';

const PostCard = ({ post }) => {
    // Check if medium_image array exists and has at least one element
    const mediumImageUrl = post.medium_image && post.medium_image.length > 0 ? post.medium_image[0].url : null;

    // Check if small_image array exists and has at least one element
    const smallImageUrl = post.small_image && post.small_image.length > 0 ? post.small_image[0].url : null;

    // Determine the thumbnail URL based on the checks
    const thumbnailUrl = mediumImageUrl || smallImageUrl || '../../public/dummy-image.jpg';

    return (
        <div className="postCard" key={post.id}>
            <div className="thumbnail-container">
                <img src={thumbnailUrl} alt={post.title} loading="lazy" />
            </div>
            <div className="postDetails">
                <p>{post.published_at}</p>
                <h3 className="postTitle">{post.title}</h3>
            </div>
        </div>
    );
};

export default PostCard;
