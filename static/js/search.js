// Search functionality for Posts page - Fixed duplicate search triggering
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initPostsSearch();
    });

    function initPostsSearch() {
        const newSearchInput = document.getElementById('posts-search-input');
        const clearBtn = document.getElementById('clear-posts-search');
        const searchInfo = document.getElementById('posts-search-info');
        const existingSearchInput = document.getElementById('post-search');

        if (!newSearchInput) return;

        let searchTimeout;
        let isSyncing = false; // 🧩 Cờ tránh vòng lặp tìm kiếm

        function syncWithExistingSearch(query) {
            if (existingSearchInput && !isSyncing) {
                isSyncing = true;
                existingSearchInput.value = query;
                existingSearchInput.dispatchEvent(new Event('input', { bubbles: true }));
                setTimeout(() => { isSyncing = false; }, 100);
            }
        }

        // Khi người dùng gõ vào ô mới
        newSearchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();

            if (query.length > 0) {
                clearBtn.style.display = 'flex';
            } else {
                clearBtn.style.display = 'none';
                searchInfo.style.display = 'none';
            }

            searchTimeout = setTimeout(() => {
                syncWithExistingSearch(query);
                updateSearchInfo(query);
            }, 300);
        });

        // Khi người dùng xóa
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                newSearchInput.value = '';
                clearBtn.style.display = 'none';
                searchInfo.style.display = 'none';
                syncWithExistingSearch('');
            });
        }

        // Phím tắt Ctrl+K và Escape
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                newSearchInput.focus();
            }
            if (e.key === 'Escape' && document.activeElement === newSearchInput) {
                newSearchInput.value = '';
                clearBtn.style.display = 'none';
                searchInfo.style.display = 'none';
                syncWithExistingSearch('');
                newSearchInput.blur();
            }
        });

        // Đồng bộ ngược lại nhưng tránh trùng
        if (existingSearchInput) {
            existingSearchInput.addEventListener('input', function() {
                if (isSyncing) return; // 🧩 tránh vòng lặp ngược
                const query = this.value;
                newSearchInput.value = query;
                if (query.length > 0) {
                    clearBtn.style.display = 'flex';
                } else {
                    clearBtn.style.display = 'none';
                    searchInfo.style.display = 'none';
                }
                updateSearchInfo(query);
            });
        }

        function updateSearchInfo(query) {
            if (!query) {
                searchInfo.style.display = 'none';
                return;
            }

            setTimeout(() => {
                const visiblePosts = document.querySelectorAll('.post-item:not([style*="display: none"])');
                if (visiblePosts.length === 0) {
                    searchInfo.innerHTML = `Không tìm thấy bài viết nào cho "${query}"`;
                } else {
                    searchInfo.innerHTML = `Tìm thấy ${visiblePosts.length} bài viết cho "${query}"`;
                }
                searchInfo.style.display = 'block';
            }, 100);
        }

        newSearchInput.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        newSearchInput.addEventListener('blur', function() {
            this.style.transform = '';
        });
    }
})();
