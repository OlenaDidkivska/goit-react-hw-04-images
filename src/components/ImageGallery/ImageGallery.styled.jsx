import styled from 'styled-components';

export const ImageGalleryEl = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ImageGalleryIdle = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 20px;
`;
