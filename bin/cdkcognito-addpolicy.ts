#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkcognitoAddpolicyStack } from '../lib/cdkcognito-addpolicy-stack';

const app = new cdk.App();
new CdkcognitoAddpolicyStack(app, 'CdkcognitoAddpolicyStack');
