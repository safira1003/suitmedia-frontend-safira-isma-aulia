import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import './ListPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const formatDate = (dateString) => {
  const datePart = dateString.split(' ')[0]; // Ambil bagian tanggal saja
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(datePart).toLocaleDateString('id-ID', options);
  return formattedDate;
}

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem('currentPage') ? JSON.parse(localStorage.getItem('currentPage')) : 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    localStorage.getItem('itemsPerPage') ? JSON.parse(localStorage.getItem('itemsPerPage')) : 10
  );
  const [sortOrder, setSortOrder] = useState(
    localStorage.getItem('sortOrder') ? JSON.parse(localStorage.getItem('sortOrder')) : 'published_at'
  );
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${itemsPerPage}&append[]=small_image&append[]=medium_image&sort=${sortOrder}`
        );

        const modifiedPosts = response.data.data.map((post) => {
          return {
            ...post,
            published_at: formatDate(post.published_at),
          };
        });

        setPosts(modifiedPosts);
        setTotalItems(response.data.meta.total); // Set total items from the API response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, sortOrder]);

  useEffect(() => {
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
    localStorage.setItem('itemsPerPage', JSON.stringify(itemsPerPage));
    localStorage.setItem('sortOrder', JSON.stringify(sortOrder));
  }, [currentPage, itemsPerPage, sortOrder]);

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStartIndex = () => (currentPage - 1) * itemsPerPage + 1;
  const getEndIndex = () => Math.min(currentPage * itemsPerPage, totalItems);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxButtons = 5;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const middle = Math.ceil(maxButtons / 2);
    let startPage = Math.max(currentPage - middle + 1, 1);
    let endPage = Math.min(startPage + maxButtons - 1, totalPages);

    if (totalPages - startPage < maxButtons - 1) {
      startPage = totalPages - maxButtons + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="postList">
      <div className="postInfo">
        <div className="showing">
          Showing {getStartIndex()} - {getEndIndex()} of {totalItems}
        </div>

        <div className="postFilter">
          <div className='postFilterChild'>
            <label>Show per page:</label>
            <select onChange={(e) => handleItemsPerPageChange(e.target.value)} value={itemsPerPage}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="postFilterChild">
            <label>Sort by:</label>
            <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>

      </div>

      {loading && <p>Loading...</p>}

      <div className="postContent">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>

    </div>
  );
};

export default PostList;
