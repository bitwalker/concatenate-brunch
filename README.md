## concatenate-brunch

Add this plugin to your project and use it like so:


```javascript
concatenate: {
    files: {
        'public/devices.json': {
            type: 'json',
            sources: [
                'public/devices/1.json',
                'public/devices/2.json',
                'public/devices/3.json',
                'public/devices/4.json',
                'public/devices/5.json',
                'public/devices/6.json',
                'public/devices/7.json',
                'public/devices/8.json',
                'public/devices/9.json',
                'public/devices/10.json'
            ]
        }
    }
}
```

The `type: 'json'` is a special flag which ensures the concatenated JSON is converted to a valid JSON array.


## License

MIT
