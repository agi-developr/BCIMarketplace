# DNS Setup for bcimarketplace.com

## Domain Configuration

Your custom domain `bcimarketplace.com` has been successfully mapped to your Google Cloud App Engine application. 

## DNS Records to Add

You need to add the following DNS records to your domain registrar:

### For bcimarketplace.com (Root Domain)
Add these A records:
- **Type**: A
- **Name**: @ (or leave blank)
- **Value**: 216.239.32.21
- **TTL**: 3600 (or default)

- **Type**: A  
- **Name**: @ (or leave blank)
- **Value**: 216.239.34.21
- **TTL**: 3600 (or default)

- **Type**: A
- **Name**: @ (or leave blank)  
- **Value**: 216.239.36.21
- **TTL**: 3600 (or default)

- **Type**: A
- **Name**: @ (or leave blank)
- **Value**: 216.239.38.21
- **TTL**: 3600 (or default)

### For IPv6 Support (Optional)
Add these AAAA records:
- **Type**: AAAA
- **Name**: @ (or leave blank)
- **Value**: 2001:4860:4802:32::15
- **TTL**: 3600 (or default)

- **Type**: AAAA
- **Name**: @ (or leave blank)
- **Value**: 2001:4860:4802:34::15
- **TTL**: 3600 (or default)

- **Type**: AAAA
- **Name**: @ (or leave blank)
- **Value**: 2001:4860:4802:36::15
- **TTL**: 3600 (or default)

- **Type**: AAAA
- **Name**: @ (or leave blank)
- **Value**: 2001:4860:4802:38::15
- **TTL**: 3600 (or default)

### For www.bcimarketplace.com
Add this CNAME record:
- **Type**: CNAME
- **Name**: www
- **Value**: ghs.googlehosted.com.
- **TTL**: 3600 (or default)

⚠️ **Critical Note**: Never use CNAME records for root domains (bcimarketplace.com). Root domains require A records pointing to Google's IP addresses as shown above. Using CNAME at root level violates DNS standards and will cause resolution failures.

## Important Notes

1. **DNS Propagation**: Changes can take up to 24-48 hours to propagate globally
2. **SSL Certificate**: Google will automatically provision an SSL certificate once DNS is properly configured
3. **Testing**: You can test the domain using tools like `dig` or online DNS checkers

## Verification Commands

Once DNS is configured, you can verify with:

```bash
# Check A records
dig bcimarketplace.com A

# Check CNAME record  
dig www.bcimarketplace.com CNAME

# Check domain mapping status
gcloud app domain-mappings list
```

## Troubleshooting

- If the domain doesn't work after 24 hours, verify DNS records are correct
- Ensure no conflicting records exist (like existing A records pointing elsewhere)
- Check with your domain registrar's support if needed

## Current Status

✅ Domain mapping created in Google Cloud  
✅ SSL certificate will be provisioned automatically  
⏳ Waiting for DNS configuration at domain registrar  
⏳ DNS propagation (up to 24-48 hours)
