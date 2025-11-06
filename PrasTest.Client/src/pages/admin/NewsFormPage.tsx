import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { CreateNewsDto, UpdateNewsDto } from '../../types';
import { newsApi } from '../../services/api';

const NewsFormPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateNewsDto | UpdateNewsDto>({
    title: '',
    imageUrl: '',
    subtitle: '',
    content: '',
    isPublished: true
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchNews();
    }
  }, [isEdit, id]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const news = await newsApi.getById(parseInt(id!));
      setFormData({
        title: news.title,
        imageUrl: news.imageUrl,
        subtitle: news.subtitle,
        content: news.content,
        isPublished: news.isPublished
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t('validation.required');
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = t('validation.required');
    } else {
      try {
        new URL(formData.imageUrl);
      } catch {
        newErrors.imageUrl = t('validation.invalidUrl');
      }
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = t('validation.required');
    }

    if (!formData.content.trim()) {
      newErrors.content = t('validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      if (isEdit) {
        await newsApi.update(parseInt(id!), formData as UpdateNewsDto);
      } else {
        await newsApi.create(formData as CreateNewsDto);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving news:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="news-form-page">
      <h1>{isEdit ? t('news.editNews') : t('news.createNews')}</h1>
      
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label htmlFor="title">{t('common.title')} *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">{t('common.imageUrl')} *</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={errors.imageUrl ? 'error' : ''}
          />
          {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subtitle">{t('common.subtitle')} *</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className={errors.subtitle ? 'error' : ''}
          />
          {errors.subtitle && <span className="error-text">{errors.subtitle}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="content">{t('common.content')} *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            {t('common.isPublished')}
          </label>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/admin')}
            className="btn-secondary"
          >
            {t('common.cancel')}
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="btn-primary"
          >
            {saving ? 'Saving...' : t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsFormPage;