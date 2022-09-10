import { Meta, StoryObj } from '@storybook/react';

import Typography from './Typography';
import { TypographyComponentProps } from './types';

export default {
  title: 'Typography',
  component: Typography,
  args: {
    children: 'This is text',
  },
  argTypes: {},
} as Meta<TypographyComponentProps>;

export const Default: StoryObj<TypographyComponentProps> = {};

export const Title1: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'title1',
  },
};

export const Title2: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'title2',
  },
};

export const Title3: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'title3',
  },
};

export const Title4: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'title4',
  },
};

export const Title5: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'title5',
  },
};

export const Title6: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'title6',
  },
};

export const Link1: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'link1',
  },
};

export const Link2: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'link2',
  },
};

export const Link3: StoryObj<TypographyComponentProps> = {
  args: {
    variant: 'link3',
  },
};

export const Link: StoryObj<TypographyComponentProps> = {
  args: {
    link: true,
  },
};

export const Color: StoryObj<TypographyComponentProps> = {
  args: {
    color: 'body',
  },
};

export const ColorNative: StoryObj<TypographyComponentProps> = {
  args: {
    color: 'red',
  },
};

export const Ellipsis: StoryObj<TypographyComponentProps> = {
  args: {
    ellipsis: {
      width: '50px',
    },
  },
};

export const AlignLeft: StoryObj<TypographyComponentProps> = {
  args: {
    textAlign: 'left',
  },
};

export const AlignCenter: StoryObj<TypographyComponentProps> = {
  args: {
    textAlign: 'center',
  },
};

export const AlignRight: StoryObj<TypographyComponentProps> = {
  args: {
    textAlign: 'right',
  },
};

export const Uppercase: StoryObj<TypographyComponentProps> = {
  args: {
    textTransform: 'uppercase',
  },
};

export const Whitespace: StoryObj<TypographyComponentProps> = {
  args: {
    whiteSpace: 'nowrap',
    style: {
      width: '50px',
    },
  },
};

export const WordBreak: StoryObj<TypographyComponentProps> = {
  args: {
    wordBreak: 'break-all',
    style: {
      width: '25px',
    },
  },
};
