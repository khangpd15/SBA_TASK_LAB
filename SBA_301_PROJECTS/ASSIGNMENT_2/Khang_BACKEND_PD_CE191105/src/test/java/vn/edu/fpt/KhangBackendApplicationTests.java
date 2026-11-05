package vn.edu.fpt;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import vn.edu.fpt.entity.Category;
import vn.edu.fpt.entity.NewsArticle;
import vn.edu.fpt.entity.SystemAccount;
import vn.edu.fpt.entity.Tag;
import vn.edu.fpt.repositories.ICategoryRepository;
import vn.edu.fpt.repositories.INewsArticleRepository;
import vn.edu.fpt.repositories.ISystemAccountRepository;
import vn.edu.fpt.repositories.ITagRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class KhangBackendApplicationTests {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ISystemAccountRepository accountRepository;

    @Autowired
    private ITagRepository tagRepository;

    @Autowired
    private INewsArticleRepository newsArticleRepository;

    @Test
    void testDatabaseConnectionAndEntities() {
        // 1. Test Categories
        List<Category> categories = categoryRepository.findAll();
        assertNotNull(categories);
        System.out.println("Categories count in DB: " + categories.size());

        // 2. Test Accounts
        List<SystemAccount> accounts = accountRepository.findAll();
        assertNotNull(accounts);
        System.out.println("Accounts count in DB: " + accounts.size());

        // 3. Test Tags
        List<Tag> tags = tagRepository.findAll();
        assertNotNull(tags);
        System.out.println("Tags count in DB: " + tags.size());

        // 4. Test News Articles
        List<NewsArticle> news = newsArticleRepository.findAll();
        assertNotNull(news);
        System.out.println("News articles count in DB: " + news.size());
    }
}

