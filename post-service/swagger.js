module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'HAL Content Management Application API',
    description: 'Application Post Module API'
  },
  tags: [
    {
      name: 'Posts',
      description: 'API for Creator'
    },
    {
      name: 'Posts Comments',
      description: 'API for Post Comments'
    },
    {
      name: 'Fans',
      description: 'API For Fans'
    }
  ],
  paths: {
    '/posts/create/text': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Create text Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }

          },
          description: 'Create text Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/create/image': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Create Image Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule',
                  'images'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  images: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              },
              encoding: {
                tags: {
                  contentType: 'application/json',
                  explode: true
                }
              }
            }

          },
          description: 'Create Image Type Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/create/audio': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Create Audio Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule',
                  'audios',
                  'artImage'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  audios: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  artImage: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }

          },
          description: 'Create Audio Type Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/create/video': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Create Video Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule',
                  'video'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  video: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }

          },
          description: 'Create Video Type Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/upload/video': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Upload video',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'video'
                ],
                properties: {
                  video: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          },
          description: 'Upload Video'
        },
        responses: {
          200: {
            description: 'video uploaded Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/upload/audio': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Upload audio',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'audio'
                ],
                properties: {
                  audio: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          },
          description: 'Upload Audio'
        },
        responses: {
          200: {
            description: 'Audio File uploaded Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/upload/audio/artWork': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Upload audio',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'artWork'
                ],
                properties: {
                  artWork: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          },
          description: 'Upload Audio Art Work'
        },
        responses: {
          200: {
            description: 'Audio Art Work uploaded Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/upload/images': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Upload Images',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'images'
                ],
                properties: {
                  images: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                }
              }
            }
          },
          description: 'Upload Images'
        },
        responses: {
          200: {
            description: 'Images uploaded Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/upload/attachments': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'Upload Attachments',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'attachments'
                ],
                properties: {
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                }
              }
            }
          },
          description: 'Upload Attachments'
        },
        responses: {
          200: {
            description: 'Attachments uploaded Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/remove/media': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      delete: {
        tags: [
          'Posts'
        ],
        summary: 'Remove File',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'fileKey'
                ],
                properties: {
                  fileKey: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'Remove File'
        },
        responses: {
          200: {
            description: 'File removed Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },

    '/posts/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'PostId to Fetch Post Data',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      get: {
        tags: [
          'Posts'
        ],
        summary: 'Get Post By PostId',
        requestBody: {

          description: 'Get Post By Id'
        },
        responses: {
          200: {
            description: 'Post Fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },

    '/posts/update/text/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide Post Id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      put: {
        tags: [
          'Posts'
        ],
        summary: 'Edit Text Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }

          },
          description: 'Edit Text Type Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/update/image/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide Post Id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      put: {
        tags: [
          'Posts'
        ],
        summary: 'Edit Image Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule',
                  'images'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  images: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },

                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }

          },
          description: 'Edit Image Type Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/update/audio/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide Post Id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      put: {
        tags: [
          'Posts'
        ],
        summary: 'Edit Audio Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule',
                  'audios'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  audios: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },

                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              }
            }

          },
          description: 'Edit Audio Type Post'
        },
        responses: {
          200: {
            description: 'Post Created Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/update/video/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide Post Id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      put: {
        tags: [
          'Posts'
        ],
        summary: 'Edit Video Type Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'status',
                  'userAccessRule',
                  'video'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['published', 'draft'],
                    default: 'published'
                  },
                  attachments: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },
                  video: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  },

                  userAccessRule: {
                    type: 'object',
                    properties: {
                      whoCanSee: {
                        type: 'string'
                      },
                      tiers: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    }
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              },
              encoding: {
                tags: {
                  contentType: 'application/json',
                  explode: true
                }
              }
            }

          },
          description: 'Edit Video Type Post'
        },
        responses: {
          200: {
            description: 'Post Update Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/postByStatus/{status}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'status',
          in: 'path',
          description: 'Fetch Posts by status',
          required: true,
          schema: {
            enum: ['published', 'draft'],
            default: 'published'
          }
        }
      ],
      get: {
        tags: [
          'Posts'
        ],
        summary: 'Fetch Posts by status',
        requestBody: {

          description: 'Fetch Posts by status'
        },
        responses: {
          200: {
            description: 'Post Fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/posts/creator/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          // required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide the Creator Id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      get: {
        tags: [
          'Fans'
        ],
        summary: 'Get Creator Posts for Fans',
        responses: {
          200: {
            description: 'Post Fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/posts/fans/feeds': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      get: {
        tags: [
          'Fans'
        ],
        summary: 'Get Feeds',
        responses: {
          200: {
            description: 'Post Fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/posts/react/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide Post Id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      post: {
        tags: [
          'Posts'
        ],
        summary: 'React on Post eg: like or dislike',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'react'
                ],
                properties: {
                  react: {
                    type: 'string',
                    enum: ['like', 'dislike'],
                    default: 'like'
                  }
                }
              }
            }

          },
          description: 'React on Post eg: like or dislike'
        },
        responses: {
          200: {
            description: 'Post like or dislike Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },
    '/posts/comment': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      post: {
        tags: [
          'Posts Comments'
        ],
        summary: 'Post Comment on Post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'postId',
                  'comment'
                ],
                properties: {
                  postId: {
                    type: 'integer',
                  },
                  comment: {
                    type: 'string',
                  },
                  parentId: {
                    type: 'integer',
                  },
                }
              }
            }

          },
          description: 'Post Comment on Post'
        },
        responses: {
          200: {
            description: 'Comment Post successfully'
          },
          401: {
            description: 'Unauthorized'
          },
          422: {
            description: 'Validation Error'
          }
        }
      }
    },

    '/posts/comments/{id}': {
      parameters: [
        {
          in: 'header',
          name: 'token',
          description: 'Authorization Token',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'id',
          in: 'path',
          description: 'Provide Post Id',
          required: true,
          schema: {
            type: 'number'
          }
        },
        {
          name: 'parentCommentId',
          in: 'query',
          description: 'Provide Comment Id (if you are getting the comments replies)',
          // required: true,
          schema: {
            type: 'number'
          }
        },
        {
          name: 'itemPerPage',
          in: 'query',
          description: 'Provide itemPerPage to fetch comments',
          required: true,
          schema: {
            type: 'number'
          }
        },
        {
          name: 'page',
          in: 'query',
          description: 'Provide Provide page number',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      get: {
        tags: [
          'Posts Comments'
        ],
        summary: 'Fetch Post Comments',
        requestBody: {

          description: 'Fetch Post Comments'
        },
        responses: {
          200: {
            description: 'Post Comments Fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
  },
  servers: [
    {
      url: process.env.SERVICE_BASE_URL + '/api'
    }
  ]
}
