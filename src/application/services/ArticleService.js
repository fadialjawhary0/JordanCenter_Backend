export class ArticleService {
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  async getAllArticles() {
    return await this.articleRepository.getAll();
  }

  async getActiveArticles() {
    return await this.articleRepository.getActive();
  }

  async getArticleById(id) {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }

  async createArticle(data) {
    return await this.articleRepository.create(data);
  }

  async updateArticle(id, data) {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }
    return await this.articleRepository.update(id, data);
  }

  async deleteArticle(id) {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new Error('Article not found');
    }
    return await this.articleRepository.delete(id);
  }

  async getSectionSettings() {
    return await this.articleRepository.getSectionSettings();
  }

  async updateSectionSettings(data) {
    return await this.articleRepository.updateSectionSettings(data);
  }
}

export default ArticleService;
