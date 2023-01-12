import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {
  GitHubRepo,
  GitHubRepoSearchResponse,
  GitHubUser,
  GitHubUserSearchResponse,
} from '../models/shared.model';

const GITHUB_URL_USERS = 'https://api.github.com/search/users';
const GITHUB_URL_REPOS = 'https://api.github.com/search/repositories';

@Injectable()
export class GithubService {
  errorMessage?: string;
  constructor(private httpClient: HttpClient) {}

  searchUsers(term: string): Observable<GitHubUser[]> {
    if (term === '') {
      return of([]);
    }

    return this.httpClient
      .get<GitHubUserSearchResponse>(GITHUB_URL_USERS, {
        params: { q: term },
      })
      .pipe(
        map((data: GitHubUserSearchResponse) => (data && data.items) || []),
        catchError((err) => {
          this.errorMessage = (err && err.message) || 'Something goes wrong';
          console.log('GithubService, searchUsers: ', term, this.errorMessage);
          return of([]);
        })
      );
  }

  public searchRepos(term: string): Observable<GitHubRepo[]> {
    if (term === '') {
      console.log('Not defined');
      return of(null);
      //return empty();
    } else {
      let params = { q: term };
      return this.httpClient.get(GITHUB_URL_REPOS, { params }).pipe(
        map((response: GitHubRepoSearchResponse) => {
          console.log('GithubService, searchRepos: ', response);
          console.log('GithubService, searchRepos, response.items.size: ', response?.items?.length);
          return response['items'];
        })
      );
    }
  }
}
