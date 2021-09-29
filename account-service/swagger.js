module.exports = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'HAL Content Management Application API',
    description: 'Application User and Creator Authentication module APIs'
  },
  tags: [
    {
      name: 'Authentication',
      description: 'API for Creator'
    },
    {
      name: 'Page Setup',
      description: 'Page Setup API'
    },
    {
      name: 'Tiers Subscription',
      description: 'Tier Subscription API'
    },
    {
      name: 'Profile Setup',
      description: 'Profile Setup API'
    },
    {
      name: 'Fans',
      description: 'Fans API'
    },
    {
      name: 'Creator Settings',
      description: 'Creator Settings'
    }
  ],
  paths: {
    '/auth/login': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Login and generate token',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'email',
                  'password'
                ],
                properties: {
                  email: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'login the system as a creator'
        },
        responses: {
          200: {
            description: 'Successfully logged in'
          }
        }
      }
    },
    '/auth/register': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Register as a Creator',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'firstName',
                  'lastName',
                  'phone',
                  'email',
                  'password',
                  'password_confirmation'
                ],
                properties: {
                  firstName: {
                    type: 'string'
                  },
                  lastName: {
                    type: 'string'
                  },
                  email: {
                    type: 'string'
                  },
                  phone: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  },
                  password_confirmation: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'Register in the system as a creator'
        },
        responses: {
          201: {
            description: 'Successfully Register and Email Sent to your email address for verification'
          },
          422: {
            description: 'Validation Errors'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/auth/verify-email-otp': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Verify Email OTP',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'otp'
                ],
                properties: {
                  otp: {
                    type: 'string'
                  }
                }
              }
            }
          }
          // "description": "login the system as a creator"
        },
        responses: {
          200: {
            description: 'Successfully Verified'
          }
        }
      }
    },
    '/auth/forgot-password': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Forgot Password',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'email'
                ],
                properties: {
                  email: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'System will send a email in your email address'
        },
        responses: {
          200: {
            description: 'Forgot Password Email Sent'
          }
        }
      }
    },
    '/auth/verify-reset-token-otp': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Reset Email OTP Verification',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'otp'
                ],
                properties: {
                  otp: {
                    type: 'string'
                  },
                  sendEmail: {
                    type: 'boolean',
                    enum: [true, false],
                    default: true
                  }
                }
              }
            }
          }
          // "description": "System will send a email in your email address"
        },
        responses: {
          200: {
            description: 'OTP Verified Successfully'
          }
        }
      }
    },
    '/auth/resend-email': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Resend Email',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'email',
                  'emailType'
                ],
                properties: {
                  email: {
                    type: 'string'
                  },
                  emailType: {
                    type: 'string',
                    enum: ['register', 'forgot', 'resetTokenOTP'],
                    default: 'register'
                  }
                }
              }
            }
          },
          description: 'Resend Email'
        },
        responses: {
          200: {
            description: 'OTP Verified Successfully'
          }
        }
      }
    },
    '/auth/reset-password': {
      post: {
        tags: [
          'Authentication'
        ],
        summary: 'Reset Password',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'token',
                  'password',
                  'password_confirmation'
                ],
                properties: {
                  token: {
                    type: 'string'
                  },
                  password: {
                    type: 'string'
                  },
                  password_confirmation: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'Reset Password'
        },
        responses: {
          201: {
            description: 'Successfully Password Reset'
          },
          422: {
            description: 'Validation Errors'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/users/upload-profile': {
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
          'Page Setup'
        ],
        summary: 'Upload Profile Picture',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'profileImg'
                ],
                properties: {
                  profileImg: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          },
          description: 'Upload Profile Picture'
        },
        responses: {
          200: {
            description: 'File Uploaded Successfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/upload-cover-photo': {
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
          'Page Setup'
        ],
        summary: 'Upload Cover Photo',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'coverPhoto'
                ],
                properties: {
                  coverPhoto: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          },
          description: 'Upload Cover Photo'
        },
        responses: {
          200: {
            description: 'File Uploaded Successfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/upload-introVideo': {
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
          'Page Setup'
        ],
        summary: 'Upload Intro Video',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'introVideo'
                ],
                properties: {
                  introVideo: {
                    type: 'string',
                    format: 'binary'
                  }
                }
              }
            }
          },
          description: 'Upload Intro Video'
        },
        responses: {
          200: {
            description: 'Video Uploaded Successfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/updateBasicInfo': {
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
          'Page Setup'
        ],
        summary: 'Enter the Profile Basic Info',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'nameForFan',
                  'creationName',
                  'soundMoreAccurate',
                  'pageURL',
                  'about',
                  'coverPhoto'
                ],
                properties: {
                  nameForFan: {
                    type: 'string'
                  },
                  creationName: {
                    type: 'string'
                  },
                  soundMoreAccurate: {
                    type: 'string'
                  },
                  pageURL: {
                    type: 'string'
                  },
                  about: {
                    type: 'string'
                  },
                  coverPhoto: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'Enter the Profile Basic Info'
        },
        responses: {
          201: {
            description: 'Record Saved Successfully'
          },
          422: {
            description: 'Validation Errors'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/users/unique-page-url': {
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
          'Page Setup'
        ],
        summary: 'Enter the Page URL',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'pageUrl'
                ],
                properties: {
                  pageUrl: {
                    type: 'string'
                  }
                }
              }
            }
          },
          description: 'Enter the Page URL'
        },
        responses: {
          200: {
            description: `
              Page Url Already Taken ({status : 2}),
              Page Url Already not Taken ({status : 1}),
            `
          },
          422: {
            description: 'Validation Errors'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/users/basic-info': {
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
          'Page Setup'
        ],
        summary: 'Fetch User Basic Info',
        requestBody: {
          content: {
            'application/json': {

            }
          },
          description: 'Fetch User Basic Info'
        },
        responses: {
          200: {
            description: 'User Detail Fetched Successfully'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/users/tiers/create': {
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
          'Page Setup'
        ],
        summary: 'Create a tier',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'price',
                  'description',
                  'status',
                  'tierImage',
                  'benefits'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  price: {
                    type: 'number'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['active', 'inActive'],
                    default: 'active'
                  },
                  tierImage: {
                    type: 'string',
                    format: 'binary'
                  },
                  benefits: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              },
              encoding: {
                benefits: {
                  contentType: 'application/json',
                  explode: true
                }
              }
            }

          },
          description: 'Create a tier'
        },
        responses: {
          200: {
            description: 'Tier Created Sucessfully'
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
    '/users/tiers/get': {
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
          'Page Setup'
        ],
        summary: 'Get User Tiers',
        requestBody: {

          description: 'Get User Tiers'
        },
        responses: {
          200: {
            description: 'Tiers fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/tiers/get/{id}': {
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
          in: 'path',
          name: 'id',
          description: 'Tier id',
          required: true,
          schema: {
            type: 'number'
          }
        }
      ],
      get: {
        tags: [
          'Page Setup'
        ],
        summary: 'Get Specific Tier By Id',
        requestBody: {

          description: 'Get Specific Tier By Id'
        },
        responses: {
          200: {
            description: 'Tier fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/tiers/update': {
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
      put: {
        tags: [
          'Page Setup'
        ],
        summary: 'Update a tier',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: [
                  'title',
                  'price',
                  'description',
                  'status',
                  // "tierImage",
                  'benefits'
                ],
                properties: {
                  title: {
                    type: 'string'
                  },
                  price: {
                    type: 'number'
                  },
                  description: {
                    type: 'string'
                  },
                  status: {
                    type: 'string',
                    enum: ['active', 'inActive'],
                    default: 'active'
                  },
                  tierImage: {
                    type: 'string',
                    format: 'binary'
                  },
                  imageUpdateFlag: {
                    type: 'boolean'
                  },
                  tierId: {
                    type: 'string'
                  },
                  benefits: {
                    type: 'array',
                    items: {
                      type: 'string'
                    }
                  }
                }
              },
              encoding: {
                benefits: {
                  contentType: 'application/json',
                  explode: true
                }
              }
            }

          },
          description: 'Create a tier'
        },
        responses: {
          200: {
            description: 'Tier Created Sucessfully'
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
    '/users/tiers/subscribe': {
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
          'Tiers Subscription'
        ],
        summary: 'Subscribe the tier',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'tierId'
                ],
                properties: {
                  tierId: {
                    type: 'string'
                  }
                }
              }
            }

          },
          description: 'Subscribe the tier'
        },
        responses: {
          200: {
            description: 'Tier Subscribed Sucessfully'
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
    '/users/tiers/subscribed/all': {
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
          'Tiers Subscription'
        ],
        summary: 'Get all subscribed Tiers',
        responses: {
          200: {
            description: 'Get Subscribed Tiers Sucessfully'
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
    '/users/change-password': {
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
      put: {
        tags: [
          'Profile Setup'
        ],
        summary: 'Change the Password',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'currentPassword',
                  'newPassword',
                  'newConfirmPassword'
                ],
                properties: {
                  currentPassword: {
                    type: 'string'
                  },
                  newPassword: {
                    type: 'string'
                  },
                  newConfirmPassword: {
                    type: 'string'
                  }
                }
              }
            }

          },
          description: 'Change the Password'
        },
        responses: {
          200: {
            description: 'Password Update Successfully'
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
    '/users/{pageUrlName}': {
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
          in: 'path',
          name: 'pageUrlName',
          description: 'Page URL',
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
        summary: 'Get Creator Profile',
        responses: {
          200: {
            description: 'Creator feed fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/settings/billing-cycle': {
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
          'Creator Settings'
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'billingCycle'
                ],
                properties: {
                  billingCycle: {
                    type: 'string',
                    enum: ['prepaid', 'postpaid'],
                    default: 'prepaid'
                  }
                }
              }
            }

          },
          description: 'select Billing Cycle'
        },
        summary: 'Save Billig Cycle Setting',
        responses: {
          200: {
            description: 'Billing cycle saved Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/settings/get-billing-cycle': {
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
          'Creator Settings'
        ],
        requestBody: {
          content: {
            'application/json': {
               
            }

          },
          description: 'Fetch Billing Cycle Setting'
        },
        summary: 'Fetch Billing Cycle Setting',
        responses: {
          200: {
            description: 'Billing cycle setting fetched Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/settings/page-setting': {
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
          'Creator Settings'
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'slug',
                  'value'
                ],
                properties: {
                  slug: {
                    type: 'string',
                    enum: ['hidePostBtn', 'hideSubscriberCount','emailForNewSubscriber','emailForComment','adultContent','googleAnalyticId'],
                    default: 'hidePostBtn'
                  },
                  value:{
                    type:'string'
                  }
                }
              }
            }

          },
          description: 'select Billing Cycle'
        },
        summary: 'Save Billig Cycle Setting',
        responses: {
          200: {
            description: 'Billing cycle saved Sucessfully'
          },
          401: {
            description: 'Unauthorized'
          }
        }
      }
    },
    '/users/settings/get-page-setting': {
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
          'Creator Settings'
        ],
        requestBody: {
          content: {
            'application/json': {
               
            }

          },
          description: 'Fetch Page Setting'
        },
        summary: 'Fetch Page Setting',
        responses: {
          200: {
            description: 'Page setting fetched Sucessfully'
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
