import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let variantLabel = "";

  if (variant === "on-sale") variantLabel = "Sale";
  if (variant === "new-release") variantLabel = "Just Released!";

  return (
    <Wrapper>
      <Link href={`/shoe/${slug}`}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Link>
      
      {Boolean(variantLabel) && <Label variant={variant}>{variantLabel}</Label>}
    </Wrapper>
  );
};

const Label = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px 12px;
  font-size: ${14 / 18}rem;
  font-weight: 700;
  color: ${COLORS.white};
  background-color ${({ variant }) => {
    if (variant === 'on-sale') return COLORS.primary;
    if (variant === 'new-release') return COLORS.secondary;
    return false;
  }}
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
  display: block;
  flex: 1 1 340px;
  min-width: 340px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${(p) =>
    p.variant === "on-sale" &&
    `
    color: ${COLORS.gray[700]};
    text-decoration: line-through;
  `}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
