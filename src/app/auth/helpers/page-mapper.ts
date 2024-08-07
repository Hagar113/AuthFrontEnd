
import { Page } from 'src/app/pages/lookup/models/pages/page-response';
import { PageDto } from '../models/page-dto';


export function mapPageToPageDto(page: Page): PageDto {
  return {
    pageId: page.pageId,
    pageName: page.pageName,
    pagePath: page.pagePath 
  };
}
